import { select } from 'd3';
import loading from '../util/loading';
import filterData from './update/filterData';
import defineIDSet from './defineSets/defineDefaultSet';
import defineVisitSet from './defineSets/defineVisitSet';
import transposeData from './transposeData';
import updateLegend from './addLegends/addVisitStatusLegend/update';
import updateNParticipants from './updateNParticipants';

export default function addResetButton() {
    // Add reset button to DOM.
    this.controls.reset = {
        button: this.controls.wrap
            .insert('button', ':first-child')
            .classed('pvl-reset-button', true)
            .property(
                'disabled',
                this.data.filters.every(
                    filter =>
                        filter.value === 'All' ||
                        (Array.isArray(filter.value) &&
                            filter.value.join('') === filter.set.join(''))
                )
            )
            .text('Reset Filters'),
        action: function() {
            this.controls.reset.button.property('disabled', true);
            loading.call(this, 'Reset controls', () => {
                const context = this;

                this.data.analysis = this.data.raw;
                this.data.filtered = this.data.raw;

                // Define updated set of participant IDs.
                defineIDSet.call(this, 'id_col');

                // Update visit set and listing columns if the changed filter controls an analysis subset.
                defineVisitSet.call(this);

                transposeData.call(this);
                updateLegend.call(this);
                updateNParticipants.call(this);

                // Update data arrays attached to displays, because state maintenance pays dividends for days.
                if (this.listing.initialized) {
                    this.listing.data.initial = this.data.transposed;
                    this.listing.data.raw = this.data.transposed;
                }
                if (this.ordinalChart.initialized) this.ordinalChart.raw_data = this.data.raw;
                if (this.linearChart.initialized) this.linearChart.raw_data = this.data.raw;

                // Update filter objects.
                this.data.filters.forEach(filter => {
                    filter.value = 'All';
                    this.displays.forEach(display => {
                        const displayFilter = display.module.filters.find(
                            filter1 => filter1.col === filter.col
                        );
                        if (displayFilter)
                            displayFilter.val = displayFilter.all
                                ? 'All'
                                : displayFilter.choices.slice();
                    });
                });

                // Update selected dropdown options.
                this.controls.wrap.selectAll('.control-group select').each(function(d) {
                    select(this)
                        .selectAll('option')
                        .property('selected', di => di === 'All' || d.multiple);
                });

                // Redraw active display(s).
                this.displays
                    .filter(display => display.active)
                    .forEach(display => {
                        display.module.draw();
                    });
            });
        }
    };

    // Add click event listener to reset button.
    this.controls.reset.button.on('click', () => {
        this.controls.reset.action.call(this);
    });
}
