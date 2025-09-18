package com.example.spaceship;

public class Player {
    private String nickName;
    private int score;

    public void addPlayer(String nickName, int score) {
        this.nickName = nickName;
        this.score = score;
    }

    public String getNickName() {
        return nickName;
    }

    public int getScore() {
        return score;
    }
}
