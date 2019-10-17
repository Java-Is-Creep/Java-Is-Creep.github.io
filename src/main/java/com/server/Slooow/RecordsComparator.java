package com.server.Slooow;

import java.util.Comparator;

public class RecordsComparator implements Comparator<RecordInMap> {

    public int compare (RecordInMap rec1, RecordInMap rec2){
        return (rec1.time-rec2.time);
    }
}