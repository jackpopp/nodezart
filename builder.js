module.exports = (envelopes) => {
    const mainEnvelope = {
        head: '',
        bodyInline: '',
        bodyLast: ''
    };

    const parsedEnvelopes = envelopes.map((val) => JSON.parse(val));
    parsedEnvelopes.forEach((env) => {
        mainEnvelope.head += env.head.join('');
        mainEnvelope.bodyInline += env.bodyInline;
        mainEnvelope.bodyLast += env.bodyLast.join('');
    });

    return mainEnvelope;
}