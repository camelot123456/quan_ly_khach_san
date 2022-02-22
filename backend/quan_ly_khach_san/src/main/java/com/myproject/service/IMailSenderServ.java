package com.myproject.service;

import java.io.File;
import java.io.FileNotFoundException;

import javax.mail.MessagingException;

import com.myproject.config.AppProperties;
import com.myproject.entity.AccountEntity;

public interface IMailSenderServ {

	public void sendSimpleEmail(String fromEmail, String toEmail, String subject, String body);
	
	public void sendAttachmentEmail(String fromEmail, String toEmail, String subject, String body, File attachment) throws MessagingException;
	
	public void sendHtmlEmail(String fromEmail, String toEmail, String subject, File htmlFile) throws MessagingException, FileNotFoundException;
	
	public void sendFormVerifyAccount(AppProperties appProperties, AccountEntity account, String verifyURL) throws MessagingException, FileNotFoundException;
	
}
