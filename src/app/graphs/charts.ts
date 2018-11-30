declare var Chart: any;

/* Create chart to region. */
export let regionChart = (regionAproveDataList, regionDisapproveDataList, regionAbstentionDataList) => new Chart(this.regionContext, {
  type: 'bar',
  data: {
    labels: [
      'Norte',
      'Nordeste',
      'Centro-Oeste',
      'Sudeste',
      'Sul',
      'Não informada'
    ],
    datasets: [
      {
        label: 'Porcentagem de aprovação',
        backgroundColor: 'rgb(68,157,68)',
        borderColor: 'rgb(255, 255, 255)',
        data: regionAproveDataList,
      },
      {
        label: 'Porcentagem de desaprovação',
        backgroundColor: 'rgb(201,48,44)',
        borderColor: 'rgb(255, 255, 255)',
        data: regionDisapproveDataList,
      },
      {
        label: 'Porcentagem de abstenção',
        backgroundColor: 'rgb(255,255,0)',
        borderColor: 'rgb(255, 255, 255)',
        data: regionAbstentionDataList,
      }
    ]
  },
  options: {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || '';

          if (label) {
            label += ': ';
          }
          label += Math.round(tooltipItem.yLabel * 100) / 100;
          return label + "%";
        }
      }
    },
    scales: {
      xAxes: [
        {
          stacked: false,
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            min: 0,
            autoSkip: false
          }
        }
      ]
    }
  }
});

/* Create chart to income. */
export let incomeChart = (incomeApproveDataList, incomeDisapproveDataList, incomeAbstentionDataList) => new Chart(this.incomeContext, {
  type: 'bar',
  data: {
    labels: [
      'Sem escolaridade',
      'Ensino Fundamental',
      'Ensino Médio',
      'Ensino Superior',
      'Pós Graduação',
      'Não informada'
    ],
    datasets: [
      {
        label: 'Porcentagem de aprovação',
        backgroundColor: 'rgb(68,157,68)',
        borderColor: 'rgb(255, 255, 255)',
        data: incomeApproveDataList,
      },
      {
        label: 'Porcentagem de desaprovação',
        backgroundColor: 'rgb(201,48,44)',
        borderColor: 'rgb(255, 255, 255)',
        data: incomeDisapproveDataList,
      },
      {
        label: 'Porcentagem de abstenção',
        backgroundColor: 'rgb(255,255,0)',
        borderColor: 'rgb(255, 255, 255)',
        data: incomeAbstentionDataList,
      }
    ]
  },
  options: {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || '';

          if (label) {
            label += ': ';
          }
          label += Math.round(tooltipItem.yLabel * 100) / 100;
          return label + "%";
        }
      }
    },
    scales: {
      xAxes: [
        {
          stacked: false,
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            min: 0,
            autoSkip: false
          }
        }
      ]
    }
  }
});

/* Create chart to education. */
export let educationChart = (educationApproveDataList, educationDisapproveDataList, educationAbstentionDataList) => new Chart(this.educationContext, {
  type: 'bar',
  data: {
    labels: [
      'Sem escolaridade',
      'Ensino Fundamental',
      'Ensino Médio',
      'Ensino Superior',
      'Pós Graduação',
      'Não informada'
    ],
    datasets: [
      {
        label: 'Porcentagem de aprovação',
        backgroundColor: 'rgb(68,157,68)',
        borderColor: 'rgb(255, 255, 255)',
        data: educationApproveDataList,
      },
      {
        label: 'Porcentagem de desaprovação',
        backgroundColor: 'rgb(201,48,44)',
        borderColor: 'rgb(255, 255, 255)',
        data: educationDisapproveDataList,
      },
      {
        label: 'Porcentagem de abstenção',
        backgroundColor: 'rgb(255,255,0)',
        borderColor: 'rgb(255, 255, 255)',
        data: educationAbstentionDataList,
      }
    ]
  },
  options: {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || '';

          if (label) {
            label += ': ';
          }
          label += Math.round(tooltipItem.yLabel * 100) / 100;
          return label + "%";
        }
      }
    },
    scales: {
      xAxes: [
        {
          stacked: false,
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            min: 0,
            autoSkip: false
          }
        }
      ]
    }
  }
});

/* Create chart to race. */
export let raceChart = (raceApproveDataList, raceDisapproveDataList, raceAbstentionDataList) => new Chart(this.raceContext, {
  type: 'bar',
  data: {
    labels: [
      'Branca',
      'Preta',
      'Amarela',
      'Parda',
      'Indígena',
      'Não informada'
    ],
    datasets: [
      {
        label: 'Porcentagem de aprovação',
        backgroundColor: 'rgb(68,157,68)',
        borderColor: 'rgb(255, 255, 255)',
        data: raceApproveDataList,
      },
      {
        label: 'Porcentagem de desaprovação',
        backgroundColor: 'rgb(201,48,44)',
        borderColor: 'rgb(255, 255, 255)',
        data: raceDisapproveDataList,
      },
      {
        label: 'Porcentagem de abstenção',
        backgroundColor: 'rgb(255,255,0)',
        borderColor: 'rgb(255, 255, 255)',
        data: raceAbstentionDataList,
      }
    ]
  },
  options: {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || '';

          if (label) {
            label += ': ';
          }
          label += Math.round(tooltipItem.yLabel * 100) / 100;
          return label + "%";
        }
      }
    },
    scales: {
      xAxes: [
        {
          stacked: false,
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            min: 0,
            autoSkip: false
          }
        }
      ]
    }
  }
});

/* Create chart to gender. */
export let genderChart = (genderApproveDataList, genderDisapproveDataList, genderAbstentionDataList) => new Chart(this.genderContext, {
  type: 'bar',
  data: {
    labels: [
      'Masculino',
      'Feminino',
      'Outro',
      'Não informado'
    ],
    datasets: [
      {
        label: 'Porcentagem de aprovação',
        backgroundColor: 'rgb(68,157,68)',
        borderColor: 'rgb(255, 255, 255)',
        data: genderApproveDataList,
      },
      {
        label: 'Porcentagem de desaprovação',
        backgroundColor: 'rgb(201,48,44)',
        borderColor: 'rgb(255, 255, 255)',
        data: genderDisapproveDataList,
      },
      {
        label: 'Porcentagem de abstenção',
        backgroundColor: 'rgb(255,255,0)',
        borderColor: 'rgb(255, 255, 255)',
        data: genderAbstentionDataList,
      }
    ]
  },
  options: {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || '';

          if (label) {
            label += ': ';
          }
          label += Math.round(tooltipItem.yLabel * 100) / 100;
          return label + "%";
        }
      }
    },
    scales: {
      xAxes: [
        {
          stacked: false,
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            min: 0,
            autoSkip: false
          }
        }
      ]
    }
  }
});

/* Create chart to parliamentarian. */
export let parliamentarianChart = (parliamentarianDataList) => new Chart(this.parliamentarianContext, {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: parliamentarianDataList,
        backgroundColor: [
          'rgb(68,157,68)',
          'rgb(201,48,44)',
          'rgb(255,255,0)',
          'rgb(115,134,213)'
        ]
      }
    ],
    labels: [
      'Porcentagem de aprovação',
      'Porcentagem de desaprovação',
      'Porcentagem de abstenção',
      'Sem voto',
    ]
  },
  options: {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.labels[tooltipItem.index] || '';

          if (label) {
            label += ': ';
          }
          label += Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100) / 100;
          return label + "%";
        }
      }
    }
  }
});

/* Create chart to population. */
export let populationChart = (populationDataList) => new Chart(this.populationContext, {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: populationDataList,
        backgroundColor: [
          'rgb(68,157,68)',
          'rgb(201,48,44)',
          'rgb(255,255,0)'
        ]
      }
    ],
    labels: [
      'Porcentagem de aprovação',
      'Porcentagem de desaprovação',
      'Porcentagem de abstenção'
    ]
  },
  options: {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.labels[tooltipItem.index] || '';

          if (label) {
            label += ': ';
          }
          label += Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100) / 100;
          return label + "%";
        }
      }
    }
  }
});
