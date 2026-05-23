package com.practise.reactPractise.controller;

import com.practise.reactPractise.model.Product;
import com.practise.reactPractise.model.ProductDTO;
import com.practise.reactPractise.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api")
public class ProductController {
    @Autowired
    private ProductService service;

    @GetMapping("products")
    public List<Product> getProduct(){
        return service.getProduct();
    }

    @GetMapping("product/{id}")
    public Product getProductById(@PathVariable int id){
        return service.getProductById(id);
    }

    @PostMapping("product")
    public Product addProduct(@RequestPart Product product, @RequestPart MultipartFile imageFile){
        try {
            return service.addProduct(product, imageFile);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image. Please try later", e);
        }
    }

    @GetMapping("product/{prodId}/image")
    public ResponseEntity<byte[]> getImageById(@PathVariable int prodId){
        Product product = service.getProductById(prodId);
        byte[] imageFile = product.getImageData();

        return ResponseEntity.ok().contentType(MediaType.valueOf(product.getImageType())).body(imageFile);
    }

    @PutMapping("product/{id}")
    public String updateProduct(@PathVariable int id, @RequestPart Product product, @RequestPart MultipartFile imageFile){
        try {
            Product product1 = service.updateProduct(id, product, imageFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return "Product Updated Successfully Guyzs";
    }

    @DeleteMapping("product/{id}")
    public String deleteProduct(@PathVariable int id){
        service.deleteProductById(id);
        return "Product Deleted Successfully";
    }


    @GetMapping("products/search")
    public List<ProductDTO> searchProducts(@RequestParam String keyword){
        System.out.println(keyword);
        return service.searchProducts(keyword);
    }

}
