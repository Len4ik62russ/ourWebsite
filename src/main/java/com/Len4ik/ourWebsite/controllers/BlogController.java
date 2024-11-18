package com.Len4ik.ourWebsite.controllers;

import com.Len4ik.ourWebsite.models.Post;
import com.Len4ik.ourWebsite.models.User;
import com.Len4ik.ourWebsite.repo.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/blog")
public class BlogController {
    @Autowired
    private PostRepository postRepository;

//    @GetMapping
//    public String blogMain(Model model) {
//        Iterable<Post> posts = postRepository.findAll();
//        model.addAttribute("posts", posts);
//        return "blog-main";
//    }

//    @GetMapping("/blog-main")
//    @ResponseBody
//    public String blogMain(Model model) {
//        Iterable<Post> posts = postRepository.findAll();
//        model.addAttribute("posts", posts);
//        return posts;
//    }

    @GetMapping("")
    @ResponseBody
    public Iterable<Post> blogMain() {
        return postRepository.findAll();
    }

    @PostMapping
    public void blogPostAdd(@RequestParam String title, @RequestParam String anons, @RequestParam String full_text, Model model) {
        Post post = new Post(title, anons, full_text);
        postRepository.save(post);
        // return "redirect:/blog";
    }

    @GetMapping("/{id}")
    public String blogDetails(@PathVariable(value = "id") long id, Model model) {
        if (!postRepository.existsById(id)) {
            return "redirect:/blog";
        }
        Optional<Post> post = postRepository.findById(id);
        ArrayList<Post> res = new ArrayList<>();
        post.ifPresent(res::add);
        model.addAttribute("post", res);

        return "blog-details";
    }

    @PutMapping("/{id}")
    public String blogPostUpdate(@PathVariable(value = "id") long id, @RequestParam String title, @RequestParam String anons, @RequestParam String full_text, Model model) {
        Post post = postRepository.findById(id).orElseThrow();
        post.setTitle(title);
        post.setAnons(anons);
        post.setFull_text(full_text);
        postRepository.save(post);
        return "redirect:/blog";
    }

    @DeleteMapping("/{id}")
    public String blogPostDelete(@PathVariable(value = "id") long id, Model model) {
        Post post = postRepository.findById(id).orElseThrow();
        postRepository.delete(post);
        return "redirect:/blog";
    }
}