package com.myproject.controller;

import java.io.FileNotFoundException;
import java.io.IOException;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.myproject.payload.ApiResponse;
import com.myproject.service.IMailSenderServ;
import com.myproject.util.FileUitl;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/email")
public class MailSenderController {

	@Autowired
	private IMailSenderServ mailSenderServ;
	
	@PostMapping("/simple")
	public ResponseEntity<?> doSendSimpleEmail(@RequestBody MailObject mailObject) {
		mailSenderServ.sendSimpleEmail(
				mailObject.getFromEmail(), 
				mailObject.getToEmail(), 
				mailObject.getSubEmail(), 
				mailObject.getBodyEmail());
		return ResponseEntity.ok().body(new ApiResponse(true, "Send email successfully."));
	}
	
	@PostMapping("/attachment")
	public ResponseEntity<?> doSendAttachmentEmail(@RequestPart("mailObject") MailObject mailObject,
			@RequestPart("attachment") MultipartFile multipartFile) throws IOException, MessagingException {
		
		mailSenderServ.sendAttachmentEmail(
				mailObject.getFromEmail(), 
				mailObject.getToEmail(), 
				mailObject.getSubEmail(), 
				mailObject.getBodyEmail(), 
				FileUitl.convertToFile(multipartFile));
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/htmlFile")
	public ResponseEntity<?> doSendHtmlEmail(@RequestPart("mailObject") MailObject mailObject,
			@RequestPart("attachment") MultipartFile multipartFile) throws IOException, MessagingException, FileNotFoundException {
		
		mailSenderServ.sendHtmlEmail(
				mailObject.getFromEmail(), 
				mailObject.getToEmail(), 
				mailObject.getSubEmail(), 
				FileUitl.convertToFile(multipartFile));
		return ResponseEntity.noContent().build();
	}
	
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class MailObject {
	private String fromEmail;
	private String toEmail;
	private String subEmail;
	private String bodyEmail;
	private String attachment;
}
