package com.Len4ik.ourWebsite.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "Main page");
        return "home";
    }

    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("title", "About us");
        model.addAttribute("link", "To the main page");
        model.addAttribute("href", "/");

        return "about";
    }

    @GetMapping("/contact")
    public String contact(Model model) {
        return "contact";
    }

    @GetMapping("/some-info/details")
    public String someInfo(Model model) {
        return "some-info-details";
    }

    // Название метода может быть любым
// Главное URL адрес отслеживать корректный
    @GetMapping("/query/1234/test")
    public String testQuery(Model model) {
        return "test"; // Название может быть любым
    }

    @GetMapping("/contacts")
    public String contacts(Model model) {
        return "contacts";
    }

}

