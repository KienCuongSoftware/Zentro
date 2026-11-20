package com.ecommerce.zentro.catalog;

import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	boolean existsByNodeType(CategoryNodeType nodeType);

	boolean existsBySlug(String slug);

	List<Category> findByNodeTypeAndActiveTrueOrderBySortOrderAscIdAsc(CategoryNodeType nodeType);

	@Query("""
			select c from Category c
			join fetch c.parent p
			where p.id in :parentIds
			  and c.active = true
			order by c.sortOrder asc, c.id asc
			""")
	List<Category> findActiveByParentIds(@Param("parentIds") Collection<Long> parentIds);
}
