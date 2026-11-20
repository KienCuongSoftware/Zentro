package com.ecommerce.zentro.user;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmailIgnoreCase(String email);

	Optional<User> findByGoogleSub(String googleSub);

	boolean existsByEmailIgnoreCase(String email);

	List<User> findAllByOrderByCreatedAtDesc();

	@Query("""
			select u from User u
			where lower(u.email) like lower(concat('%', :q, '%'))
			   or lower(u.fullName) like lower(concat('%', :q, '%'))
			order by u.createdAt desc
			""")
	List<User> searchByEmailOrFullName(@Param("q") String q);
}
