package com.myproject.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.web.multipart.MultipartFile;

public class FileUtil {

	public static File convertToFile(MultipartFile multipartFile) throws FileNotFoundException, IOException {
		File file = new File(multipartFile.getOriginalFilename());
		try(FileOutputStream fos = new FileOutputStream(file)) {
			fos.write(multipartFile.getBytes());
		}
		return file;
	}
	
	public static void saveFile(MultipartFile multipartFile, String fileName, String uri) throws IOException {
		Path path = Paths.get(uri);
		
		if (!Files.exists(path)) {
			Files.createDirectories(path);
		}
		InputStream stream = multipartFile.getInputStream();
		Path pathFile = path.resolve(fileName);
		Files.copy(stream, pathFile, StandardCopyOption.REPLACE_EXISTING);
		
	}
	
	public static void deleteFile(String fileName, String uri) throws IOException {
		Path path = Paths.get(uri);
		Path pathFile = path.resolve(fileName);
		Files.deleteIfExists(pathFile);
		
	}
	
}
