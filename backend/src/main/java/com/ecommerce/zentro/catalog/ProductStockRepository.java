package com.ecommerce.zentro.catalog;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductStockRepository extends JpaRepository<ProductStock, Long> {

	List<ProductStock> findByProductIdOrderByProvinceSortOrderAscProvinceNameAsc(Long productId);

	@Modifying(clearAutomatically = true, flushAutomatically = true)
	@Query("delete from ProductStock ps where ps.product.id = :productId")
	void deleteByProductId(@Param("productId") Long productId);
}