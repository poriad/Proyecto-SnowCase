<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml"
  xmlns:th="http://www.thymeleaf.org">
    <head>
        <title>Registration Success</title>
    </head>
    <body>
    <p>hola</p>
            <span th:text="'A verification email has been sent to: ' + ${emailId}"></span>
    </body>
</html>