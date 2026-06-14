const profesionalOcupado = (horaSolicitada, horariosOcupadosProfesional) => {
    return horariosOcupadosProfesional.includes(horaSolicitada);
};

module.exports = { profesionalOcupado};