package com.myproject.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public class FileUitl {

	public static File convertToFile(MultipartFile multipartFile) throws FileNotFoundException, IOException {
		File file = new File(multipartFile.getOriginalFilename());
		try(FileOutputStream fos = new FileOutputStream(file)) {
			fos.write(multipartFile.getBytes());
		}
		return file;
	}
	
	
	
}
