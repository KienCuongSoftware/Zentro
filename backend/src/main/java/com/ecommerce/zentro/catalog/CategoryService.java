package com.ecommerce.zentro.catalog;

import com.ecommerce.zentro.catalog.dto.CategoryMenuResponse;
import com.ecommerce.zentro.catalog.dto.CategoryMenuResponse.CategoryMenuGroup;
import com.ecommerce.zentro.catalog.dto.CategoryMenuResponse.CategoryMenuItem;
import com.ecommerce.zentro.catalog.dto.CategoryMenuResponse.CategoryMenuRoot;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CategoryService {

	private final CategoryRepository categoryRepository;

	@Transactional(readOnly = true)
	public CategoryMenuResponse getMenu() {
		List<Category> roots = categoryRepository
				.findByNodeTypeAndActiveTrueOrderBySortOrderAscIdAsc(CategoryNodeType.ROOT);

		if (roots.isEmpty()) {
			return new CategoryMenuResponse(List.of());
		}

		List<Long> rootIds = roots.stream().map(Category::getId).toList();
		List<Category> groups = categoryRepository.findActiveByParentIds(rootIds);

		List<Long> groupIds = groups.stream().map(Category::getId).toList();
		List<Category> items = groupIds.isEmpty()
				? List.of()
				: categoryRepository.findActiveByParentIds(groupIds);

		Map<Long, List<Category>> groupsByRoot = groups.stream()
				.collect(Collectors.groupingBy(group -> group.getParent().getId()));
		Map<Long, List<Category>> itemsByGroup = items.stream()
				.collect(Collectors.groupingBy(item -> item.getParent().getId()));

		List<CategoryMenuRoot> menu = new ArrayList<>();
		for (Category root : roots) {
			List<CategoryMenuGroup> menuGroups = groupsByRoot
					.getOrDefault(root.getId(), List.of())
					.stream()
					.map(group -> new CategoryMenuGroup(
							group.getId(),
							group.getName(),
							group.getSlug(),
							itemsByGroup.getOrDefault(group.getId(), List.of()).stream()
									.map(item -> new CategoryMenuItem(
											item.getId(),
											item.getName(),
											item.getSlug(),
											item.getBadge()
									))
									.toList()
					))
					.toList();

			menu.add(new CategoryMenuRoot(
					root.getId(),
					root.getName(),
					root.getSlug(),
					root.getIconKey(),
					menuGroups
			));
		}

		return new CategoryMenuResponse(menu);
	}
}
