<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml"
  xmlns:th="http://www.thymeleaf.org">
    <head>
        <title>Register</title>
    </head>
    <body>
        <form  th:action="@{/registerForm}" th:object="${user}" method="post">
            <table>
                <tr>
                    <td><label for="firstName">First Name</label></td>
                    <td><input th:field="*{firstName}" type="text" name="firstName"></input></td>
                </tr>
                <tr>
                    <td><label for="lastName">Last Name</label></td>
                    <td><input th:field="*{lastName}" type="text" name="lastName"></input></td>
                </tr>
                <tr>
                    <td><label for="email">Email</label></td>
                    <td><input th:field="*{email}" type="text" name="email"></input></td>
                </tr>
                <tr>
                    <td><label for="password">Password</label></td>
                    <td><input th:field="*{password}" type="password" name="password"></input></td>
                </tr>
                <tr>
                    <td><input type="reset" value="Clear"/></td>
                    <td><input type="submit" value="Submit"></input></td>
                </tr>
            </table>
        </form>
    </body>
</html>