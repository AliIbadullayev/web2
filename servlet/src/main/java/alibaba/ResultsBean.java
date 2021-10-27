package alibaba;

import java.util.ArrayList;
import java.util.List;

public class ResultsBean {
    public List<Result> results;

    public ResultsBean() {
        this(new ArrayList<>());
    }

    public ResultsBean(List<Result> bean) {
        this.results = bean;
    }

    public List<Result> getResults() {
        return results;
    }

    public void setResults(List<Result> results) {
        this.results = results;
    }
}