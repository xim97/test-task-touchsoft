package by.efimovic;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class VisitJournal {
    private String path;
    private List<Pair<Integer, Integer>> listOfTimes = new ArrayList<Pair<Integer, Integer>>();

    private VisitJournal() {
    }

    public VisitJournal(String path) {
        this.path = path;
    }

    private void inputTime() throws Exception {
        BufferedReader bufferedReader = new BufferedReader(new FileReader(path));
        String line;
        while ((line = bufferedReader.readLine()) != null) {
            getTime(line);
        }
        if (listOfTimes.size() == 0) {
            throw new IOException("file is empty");
        }
    }

    public int findMaximumOfEmployees() throws Exception {
        inputTime();
        Collections.sort(listOfTimes, new PairIntegerComparator());
        return calculateMaximumOfEmployees();
    }

    private int calculateMaximumOfEmployees() {
        int result = 0, currentNumber = 0;
        for (Pair<Integer, Integer> pair : listOfTimes) {
            currentNumber += pair.getSecond();
            result = Integer.max(result, currentNumber);
        }
        return result;
    }

    private void getTime(String line) throws NumberFormatException {
        String[] strings = line.split("[\\s:]");
        int[] integers = new int[4];
        if (strings.length < 4) {
            throw new NumberFormatException("wrong input format");
        }
        for (int i = 0; i < 4; i++) {
            integers[i] = Integer.parseInt(strings[i]);
        }
        if (integers[0] < 0 || integers[0] > 23 || integers[1] < 0 || integers[1] > 59 ||
                integers[2] < 0 || integers[2] > 23 || integers[3] < 0 || integers[3] > 59) {
            throw new NumberFormatException("wrong input format");
        }
        listOfTimes.add(new Pair<>(Integer.parseInt(strings[0]) * 60 + Integer.parseInt(strings[1]), 1));
        listOfTimes.add(new Pair<>(Integer.parseInt(strings[2]) * 60 + Integer.parseInt(strings[3]), -1));
    }

    public static void main(String[] args) {
        try {
            System.out.println(new VisitJournal("D:\\3curs\\touchsoft\\java\\java\\resources\\input1.txt").findMaximumOfEmployees());
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
        }
    }
}
