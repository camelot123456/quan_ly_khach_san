package com.myproject.util;


import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

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

}
