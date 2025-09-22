package com.example.spaceship;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class JdbcService {

    @Autowired
    private DataSource dataSource;

    public void insertPlayer(String nickname, int score) throws SQLException {
        try (Connection conn = dataSource.getConnection()) {
            String sql = "INSERT INTO \"spaceshipRecords\" (\"nickName\", score) VALUES (?, ?)";
            PreparedStatement stmt = dataSource.getConnection().prepareStatement(sql);
            stmt.setString(1, nickname);
            stmt.setInt(2, score);
            stmt.executeUpdate();
            stmt.close();
        }
    }

    public ArrayList<Player> getAllPlayer() throws SQLException {
 String sql = "SELECT * FROM \"spaceshipRecords\" ORDER BY \"score\" DESC";
    
    try (Connection conn = dataSource.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql);
         ResultSet rs = stmt.executeQuery()) {

        ArrayList<Player> players = new ArrayList<>();
        
        while (rs.next()) {

            Player player = new Player();
            player.addPlayer(rs.getString("nickName"), rs.getInt("score"));

                            // pl. oszlop neve "id"
            
            
            players.add(player);
        }
        return players;
    }
}

    public List<Player> getAllRecords() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllRecords'");
    }




}
