<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<jsp:useBean id="beans" class="alibaba.ResultsBean" scope="session" />

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css" type="text/css">
    <title>Ибадуллаев Алибаба P3215</title>
</head>
<body>

<h1 class="header" >Ибадуллаев Алибаба Эльбрус оглы <br>
    P3215 вариант: 15008</h1>
<object class="graph" type="image/svg+xml" data="graph.svg"  id="graph">
    <span>here must be svg</span>
</object>

<table border="1" cellpadding="0" cellspacing="0" width="100%">
    <form id="form" action="" onsubmit="return validateForm()" method="get">
        <tr>
            <th width="50%" >Выберите координату по Х</th>
            <th width="50%">

                <input type="checkbox" class="x_coordinate_checkbox" name="x_coordinat" onclick="storeVar(this.value, 'x')"  id="x_minus_4" value="-4">
                <label for="x_minus_4">-4</label>
                <input type="checkbox" class="x_coordinate_checkbox" name="x_coordinat" onclick="storeVar(this.value, 'x')"  id="x_minus_3" value="-3">
                <label for="x_minus_3">-3</label>
                <input type="checkbox" class="x_coordinate_checkbox" name="x_coordinat" onclick="storeVar(this.value, 'x')"  id="x_minus_2" value="-2">
                <label for="x_minus_2">-2</label>
                <input type="checkbox" class="x_coordinate_checkbox" name="x_coordinat" onclick="storeVar(this.value, 'x')"  id="x_minus_1" value="-1">
                <label for="x_minus_1">-1</label>
                <input type="checkbox" class="x_coordinate_checkbox" name="x_coordinat" onclick="storeVar(this.value, 'x')"  id="x_0" value="0">
                <label for="x_0">0</label>
                <input type="checkbox" class="x_coordinate_checkbox"  name="x_coordinat" onclick="storeVar(this.value, 'x')"  id="x_1" value="1">
                <label for="x_1">1</label>
                <input type="checkbox" class="x_coordinate_checkbox" name="x_coordinat" onclick="storeVar(this.value, 'x')"  id="x_2" value="2">
                <label for="x_2">2</label>
                <input type="checkbox" class="x_coordinate_checkbox" name="x_coordinat" onclick="storeVar(this.value, 'x')"  id="x_3" value="3">
                <label for="x_3">3</label>
                <input type="checkbox" class="x_coordinate_checkbox" name="x_coordinat" onclick="storeVar(this.value, 'x')"  id="x_4" value="4">
                <label for="x_4">4</label>
            </th>
        </tr>
        <tr>
            <th width="50%" >Выберите координату по Y</th>
            <th width="50%">
                <input type="text" name="y_coordinat" id="y_coordinat" placeholder="(-5..5)">

            </th>
        </tr>
        <tr>
            <th width="50%" >Выберите радиус</th>
            <th width="50%">

                <input type="checkbox" class="radius_checkbox" name="radius" onclick="storeVar(this.value, 'r')"  id="r_1" value="1">
                <label for="r_1">1</label>
                <input type="checkbox" class="radius_checkbox" name="radius" onclick="storeVar(this.value, 'r')"  id="r_1.5" value="1.5">
                <label for="r_1.5">1.5</label>
                <input type="checkbox" class="radius_checkbox" name="radius" onclick="storeVar(this.value, 'r')"  id="r_2" value="2">
                <label for="r_2">2</label>
                <input type="checkbox" class="radius_checkbox" name="radius" onclick="storeVar(this.value, 'r')"  id="r_2.5" value="2.5">
                <label for="r_2.5">2.5</label>
                <input type="checkbox" class="radius_checkbox" name="radius" onclick="storeVar(this.value, 'r')"  id="r_3" value="3">
                <label for="r_3">3</label>

            </th>
        </tr>
        <input id="timezone" type="hidden" name="timezone" value="">
        <tr>
            <th colspan="2">
                <button >Проверить точку</button>
            </th>
        </tr>
    </form>

    <tr>
        <th colspan="2">
            <span id="error"></span>
        </th>
    </tr>
</table>
<script src="script.js"></script>
<table border='1' cellpadding='0' cellspacing='0' width='100%' id="result_table">
    <tr>
        <th width='16.6%'>
            X
        </th>
        <th width='16.6%'>
            Y
        </th>
        <th width='16.6%'>
            Радиус
        </th>
        <th width='16.6%'>
            Время запроса
        </th>
        <th width='16.6%'>
            Время выполнения (нс)
        </th>
        <th width='16.6%'>
            Результат
        </th>
    </tr>
<%--    <%ResultsBean beans = (ResultsBean)  request.getSession().getAttribute("bean");--%>
<%--    List<Result> list = beans.getBean();--%>
<%--        for(Result result : list){--%>
<%--            System.out.println(result);--%>
<%--        }--%>

<%--    %>--%>

    <c:forEach var="bean" items="${beans.results}">
        <tr>
            <th width='16.6%'>${bean.xValue}</th>
            <th width='16.6%'>${bean.yValue}</th>
            <th width='16.6%'>${bean.rValue}</th>
            <th width='16.6%'>${bean.currentTime}</th>
            <th width='16.6%'>${bean.executionTime}</th>
            <th width='16.6%'>${bean.hitResult}</th>
        </tr>
    </c:forEach>
</table>
</body>
</html>