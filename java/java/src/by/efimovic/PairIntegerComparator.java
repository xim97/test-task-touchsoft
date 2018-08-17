package by.efimovic;

import java.util.Comparator;

public class PairIntegerComparator implements Comparator<Pair<Integer, Integer>> {

    public int compare(Pair<Integer, Integer> firstPair, Pair<Integer, Integer> secondPair) {
        if (firstPair.getFirst() - secondPair.getFirst() < 0) {
            return -1;
        } else {
            if (firstPair.getFirst().equals(secondPair.getFirst())) {
                return secondPair.getSecond() - firstPair.getSecond();
            } else {
                return 1;
            }
        }
    }
}
