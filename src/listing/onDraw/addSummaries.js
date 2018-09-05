import participant from './addSummaries/participant';
import visit from './addSummaries/visit';

export default function addSummaries() {
    participant.call(this);
    visit.call(this);
}
