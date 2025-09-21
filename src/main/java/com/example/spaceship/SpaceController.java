package com.example.spaceship;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.ui.Model;

@Controller
public class SpaceController {

    private final JdbcService jdbcService;

    @Autowired
    public SpaceController(JdbcService jdbcService) {
        this.jdbcService = jdbcService;
    }

    @GetMapping("/")
    public String getSpace(Model model) {
        return "space";
    }

    @GetMapping("/game")
    public String getGame() {
        return "game";
    }

    @GetMapping("/csslearn")
    public String getCsslearn() {
        return "csslearn";
    }

}
