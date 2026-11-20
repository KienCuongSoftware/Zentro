package com.ecommerce.zentro.catalog;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProvinceRepository extends JpaRepository<Province, Long> {

	List<Province> findAllByOrderBySortOrderAscNameAsc();

	Optional<Province> findBySlug(String slug);

	long count();
}
