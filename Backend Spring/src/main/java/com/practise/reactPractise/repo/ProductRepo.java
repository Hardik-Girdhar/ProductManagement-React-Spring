package com.practise.reactPractise.repo;

import com.practise.reactPractise.model.Product;
import com.practise.reactPractise.model.ProductDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    @Query("select new com.practise.reactPractise.model.ProductDTO(" +
            "p.id, p.name, p.brand, p.category) " +
            "from Product p where " +
            "lower(p.name) like lower(concat('%', :keyword, '%')) or " +
            "lower(p.brand) like lower(concat('%', :keyword, '%')) or " +
            "lower(p.description) like lower(concat('%', :keyword, '%')) or " +
            "lower(p.category) like lower(concat('%', :keyword, '%'))")
    List<ProductDTO> searchProducts(@Param("keyword") String keyword);
}
