<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@page import="com.cwstz.zig.session.AccountMap" %>
<%@page import="java.util.*" %>
<%@page import="com.cwstz.zig.responses.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<script src="js/jquery/jquery.js"></script>
<script src="js/manage/manage.js"></script>

<style type="text/css">
	table {
/* 		border: medium solid #000000; */
		width: 50%;
	}
	td, th {
		white-space : nowrap;
		border: thin solid #6495ed;
		width: 50%;
		padding: 0 10px;
	}
</style>
<title>STZ Stub</title>
</head>
<body>
	<h1>STZ Stub Manager</h1>
	
	<div>
		<span>Users</span>
		<select id="users-select">
				<option>---</option>
			<%
				Collection<UserAccount> accounts = AccountMap.HASHMAP.getAccounts();
				for (UserAccount account : accounts) {
			%>
				<option value="<%= account.getLogin() %>"><%= account.getLogin() %></option>
			<%
				}
			%>
		</select>
		<button id="refresh-user">Refresh</button>
		
	</div>
	<hr/>
	<div>
		<span id="user-content"></span>
	</div>
</body>
</html>