package com.myproject.util;


import org.junit.Test;

public class CookieUtilTest {

	@Test
	public void testSerialize() {
		String a = "hello";
		System.out.println(CookieUtil.serialize(a));;
	}

}
