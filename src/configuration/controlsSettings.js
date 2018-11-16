export default function controlsSettings() {
    return {
        inputs: [
            {
                type: 'subsetter',
                value_col: null,
                label: 'Site'
            },
            {
                type: 'subsetter',
                value_col: null,
                label: 'Participant Status',
                multiple: true,
            }
        ]
    };
}
