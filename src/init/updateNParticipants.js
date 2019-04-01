export default function updateNParticipants() {
    this.containers.nParticipants.select('.pvl-n-participants').text(this.data.transposed.length);
}
