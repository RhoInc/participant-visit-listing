import addVisitStatusLegend from './addLegends/addVisitStatusLegend';
import addVisitExpectationLegend from './addLegends/addVisitExpectationLegend';

export default function addLegends() {
    addVisitStatusLegend.call(this);
    addVisitExpectationLegend.call(this);
}
