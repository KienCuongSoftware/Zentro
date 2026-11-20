package com.ecommerce.zentro.catalog;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {

	boolean existsBySlug(String slug);

	Optional<Product> findBySlug(String slug);

	List<Product> findAllByOrderByCreatedAtDesc();

	@Query("""
			select p from Product p
			left join fetch p.category
			where lower(p.name) like lower(concat('%', :q, '%'))
			   or lower(p.brand) like lower(concat('%', :q, '%'))
			   or lower(p.slug) like lower(concat('%', :q, '%'))
			order by p.createdAt desc
			""")
	List<Product> search(@Param("q") String q);

	@Query("""
			select p from Product p
			left join fetch p.category
			order by p.createdAt desc
			""")
	List<Product> findAllWithCategory();
}
