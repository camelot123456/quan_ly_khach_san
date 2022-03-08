package com.myproject.util;


import java.io.File;
import java.io.FileNotFoundException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;
import java.util.concurrent.TimeUnit;

import org.junit.Test;

public class CookieUtilTest {

	@Test
	public void testSerialize() throws FileNotFoundException {
		Scanner sc = new Scanner(new File("verify-email.html"));
		String htmlContent = "";

		while (sc.hasNext()) {
			htmlContent += sc.nextLine();
		}
		System.out.println(htmlContent);
		sc.close();
	}

	@Test
	public void testReduce() {
		
		SimpleDateFormat myFormat = new SimpleDateFormat("dd MM yyyy");
		String inputString1 = "23 01 1997";
		String inputString2 = "27 01 1997";

		try {
		    Date date1 = myFormat.parse(inputString1);
		    Date date2 = myFormat.parse(inputString2);
		    long diff = date2.getTime() - date1.getTime();
		    System.out.println ("Days: " + TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS));
		} catch (Exception e) {
		    e.printStackTrace();
		}
		
	}
	
}
