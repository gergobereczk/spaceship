package com.example.spaceship;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/spaceships")
public class SpaceshipRestController {

    @Autowired
    private JdbcService service;

    @GetMapping
    public List<Player> getAll(@RequestParam String nickName,
        @RequestParam int score) throws SQLException {

            
        service.insertPlayer(nickName, score); // már működni fog
       
        return service.getAllPlayer();
    }
}
