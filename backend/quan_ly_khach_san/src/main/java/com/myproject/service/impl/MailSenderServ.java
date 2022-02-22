package com.myproject.service.impl;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.myproject.config.AppProperties;
import com.myproject.entity.AccountEntity;
import com.myproject.service.IMailSenderServ;

@Service
public class MailSenderServ implements IMailSenderServ {

	@Autowired
	private JavaMailSender mailSender;

	@Override
	public void sendSimpleEmail(String fromEmail, String toEmail, String subject, String body) {
		// TODO Auto-generated method stub
		SimpleMailMessage message = new SimpleMailMessage();

		message.setFrom(fromEmail);
		message.setTo(toEmail);
		message.setSubject(subject);
		message.setText(body);

		mailSender.send(message);
	}

	@Override
	public void sendAttachmentEmail(String fromEmail, String toEmail, String subject, String body, File attachment)
			throws MessagingException {
		// TODO Auto-generated method stub
		MimeMessage message = mailSender.createMimeMessage();

		MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

		helper.setFrom(fromEmail);
		helper.setTo(toEmail);
		helper.setSubject(subject);
		helper.setText(body);

		FileSystemResource resource = new FileSystemResource(attachment);
		helper.addAttachment(resource.getFilename(), resource);

		mailSender.send(message);
	}

	@Override
	public void sendHtmlEmail(String fromEmail, String toEmail, String subject, File htmlFile)
			throws MessagingException, FileNotFoundException {
		// TODO Auto-generated method stub
		MimeMessage message = mailSender.createMimeMessage();

		MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

		helper.setFrom(fromEmail);
		helper.setTo(toEmail);
		helper.setSubject(subject);

		Scanner sc = new Scanner(htmlFile);

		String htmlContent = "";

		while (sc.hasNext()) {
			htmlContent += sc.nextLine();
		}

		message.setContent(htmlContent, "text/html; charset=UTF-8");

		mailSender.send(message);
		sc.close();
	}

	@Override
	public void sendFormVerifyAccount(AppProperties appProperties, AccountEntity account,
			String verifyURL) throws MessagingException, FileNotFoundException {
		// TODO Auto-generated method stub

		String subject = "Xác minh email của tài khoản.";
		
		MimeMessage message = mailSender.createMimeMessage();

		MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

		helper.setFrom(appProperties.getSystemConstant().getEmailSystem());
		helper.setTo(account.getEmail());
		helper.setSubject(subject);

		Scanner sc = new Scanner(new File("src/main/resources/static/verify-email.html"));

		String htmlContent = "";

		while (sc.hasNext()) {
			htmlContent += sc.nextLine();
		}
		
		verifyURL += "?otpCode=" + account.getOtpCode();
		
		htmlContent = htmlContent.replace("[[${nameAccount}]]", account.getName());
		htmlContent = htmlContent.replace("[[${verifyURL}]]", verifyURL);
		
		message.setContent(htmlContent, "text/html; charset=UTF-8");
		
		mailSender.send(message);
		sc.close();
	}

}
