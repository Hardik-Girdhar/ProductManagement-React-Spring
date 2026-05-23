package com.practise.reactPractise.service;

import com.practise.reactPractise.model.Product;
import com.practise.reactPractise.model.ProductDTO;
import com.practise.reactPractise.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepo repo;

    public List<Product> getProduct(){
        return repo.findAll()
                .stream()
                .filter(p -> !p.isDeleted())
                .toList();
    }

    public Product getProductById(int id) {
        return repo.findById(id).orElse(new Product());
    }

    public Product addProduct(Product product, MultipartFile multipartFile) throws IOException {
        product.setImageName(multipartFile.getOriginalFilename());
        product.setImageType(multipartFile.getContentType());
        product.setImageData(multipartFile.getBytes());

        return repo.save(product);
    }

    public Product updateProduct(int id, Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());

        return repo.save(product);
    }

    public void deleteProductById(int id) {
//        repo.deleteById(id);
        Product product = repo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setDeleted(true);

        repo.save(product);
    }

    public List<ProductDTO> searchProducts(String keyword) {
        return repo.searchProducts(keyword);
    }
}
