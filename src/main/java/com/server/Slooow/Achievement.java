package com.server.Slooow;

import com.server.Slooow.AchivementList.ACHIVETYPE;

public class Achievement{
    private String text;
    private int numericCondition;
    private ACHIVETYPE type;
    private boolean conseguido = false;
    private int points;
    private String level;

    public Achievement(String text, int numericCondition, ACHIVETYPE type, int points,String level) {
        this.text = text;
        this.numericCondition = numericCondition;
        this.type = type;
        this.points = points;
        this.level = level;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getNumericCondition() {
        return numericCondition;
    }

    public void setNumericCondition(int numericCondition) {
        this.numericCondition = numericCondition;
    }

    public ACHIVETYPE getType() {
        return type;
    }

    public void setType(ACHIVETYPE type) {
        this.type = type;
    }

    public boolean isConseguido() {
        return conseguido;
    }

    public void setConseguido(boolean conseguido) {
        this.conseguido = conseguido;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    @Override
    public String toString() {
        return "Achievement [conseguido=" + conseguido + ", numericCondition=" + numericCondition + ", points=" + points
                + ", text=" + text + ", type=" + type + "]";
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }


}