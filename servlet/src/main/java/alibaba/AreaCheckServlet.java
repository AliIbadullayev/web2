package alibaba;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, NumberFormatException {
        long startTime = System.nanoTime();

        String x = req.getParameter("x_coordinat");
        String y = req.getParameter("y_coordinat");
        String radius = req.getParameter("radius");

        if (validate(x, y, radius)){
            double xValue = Double.parseDouble(x);
            double yValue = Double.parseDouble(y);
            double rValue = Double.parseDouble(radius);
            boolean isHit = checkHit(xValue, yValue, rValue);
            System.out.println("good");

            OffsetDateTime currentTimeObject = OffsetDateTime.now(ZoneOffset.UTC);
            String currentTime;
            try {
                currentTimeObject = currentTimeObject.minusMinutes(Long.parseLong(req.getParameter("timezone")));
                currentTime = currentTimeObject.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
            } catch (Exception exception) {
                currentTime = "HH:mm:ss";
            }

            String executionTime = String.valueOf(System.nanoTime() - startTime);

            ResultsBean bean = (ResultsBean) req.getSession().getAttribute("beans");
            if (bean == null) {
                bean = new ResultsBean();
                System.out.println("bean is null ");
            }
            bean.getResults().add(new Result(xValue, yValue, rValue, currentTime, executionTime, isHit));
            req.getSession().setAttribute("beans", bean);

        } else System.out.println("bad");
        getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
    }
    public boolean checkHit(double xVal, double yVal, double radiusVal){
        return checkTriangle(xVal, yVal, radiusVal) || checkCircle(xVal, yVal, radiusVal) || checkRectangle(xVal, yVal, radiusVal);
    }

    private boolean checkRectangle(double xVal, double yVal, double radiusVal) {
        return xVal<=radiusVal && yVal >= -radiusVal && xVal >= 0 && yVal <= 0;
    }

    private boolean checkCircle(double xVal, double yVal, double radiusVal) {
        return Math.pow(xVal,2)+ Math.pow(yVal,2) <= Math.pow(radiusVal/2, 2) && xVal >= 0 && yVal >= 0;
    }

    private boolean checkTriangle(double xVal, double yVal, double radiusVal) {
        return yVal <= 0.5 * xVal + radiusVal * 0.5 && xVal <= 0 && yVal >= 0;
    }

    public boolean validate (String x, String y, String radius){
        return validateX(x) && validateY(y) && validateRadius(radius);
    }
    public boolean validateX(String x){
        int [] xArr = {4,3,2,1,0,-1,-2,-3,-4};
        try {
            if (!x.isEmpty()) {
                int parsedX = Integer.parseInt(x);
                return parsedX <= 4 && parsedX >= -4 && !Arrays.stream(xArr).noneMatch(i -> i == parsedX);
            } else return false;
        } catch (NumberFormatException e) {
           return false;
        }

    }
    public boolean validateY(String y){
        try {
            if (!y.isEmpty()) {
                float parsedY = Float.parseFloat(y);
                return !(parsedY >= 5) && !(parsedY <= -5);
            } else return false;
        } catch (NumberFormatException e) {
            return false;
        }

    }
    public boolean validateRadius(String radius){
        double [] radiusArr = {1.0, 1.5, 2.0, 2.5, 3};
        try {
            if (!radius.isEmpty()) {
                final double parsedRadius = Double.parseDouble(radius);
                return !(parsedRadius < 1) && !(parsedRadius > 3) && !Arrays.stream(radiusArr).noneMatch(i -> i == parsedRadius);
            } else return false;
        } catch (NumberFormatException e) {
            return false;
        }


    }


}
