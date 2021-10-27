package alibaba;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String x = req.getParameter("x_coordinat");
        String y = req.getParameter("y_coordinat");
        String radius = req.getParameter("radius");
        if (x != null && y!= null && radius!=null){
            getServletContext().getNamedDispatcher("AreaCheckServlet").forward(req,resp);
        }
        else {
            getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        }


    }

    @Override
    public void destroy() {

    }
}
