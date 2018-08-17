package test;

import by.efimovic.VisitJournal;
import org.junit.Assert;
import org.junit.Test;

import java.io.FileNotFoundException;

public class VisitJournalTest {

    @Test
    public void testVisitJournalNumber1() throws Exception {
        Assert.assertEquals(new VisitJournal("resources\\input1.txt").findMaximumOfEmployees(), 4);
    }

    @Test
    public void testVisitJournalNumber2() throws Exception {
        Assert.assertEquals(new VisitJournal("resources\\input2.txt").findMaximumOfEmployees(), 1);
    }

    @Test(expected = FileNotFoundException.class)
    public void testFileNotFound() throws Exception {
        new VisitJournal("asdf").findMaximumOfEmployees();
    }

    @Test(expected = NumberFormatException.class)
    public void testNumberFormatExceptionNumber1() throws Exception{
        new VisitJournal("resources\\inputWrongFormat1.txt").findMaximumOfEmployees();
    }

    @Test(expected = NumberFormatException.class)
    public void testNumberFormatExceptionNumber2() throws Exception{
        new VisitJournal("resources\\inputWrongFormat2.txt").findMaximumOfEmployees();
    }



}
