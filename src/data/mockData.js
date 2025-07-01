
// Generateing mock data for mptt chart
export const generateMPPTTrendData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = 24 - i;
    
    const solarMultiplier = hour >= 6 && hour <= 18 
      ? Math.sin(((hour - 6) / 12) * Math.PI) 
      : 0;
    
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      channel1: Math.max(0, 400 + solarMultiplier * 200 + Math.random() * 50),
      channel2: Math.max(0, 450 + solarMultiplier * 250 + Math.random() * 60),
      channel3: Math.max(0, 420 + solarMultiplier * 220 + Math.random() * 55),
      channel4: Math.max(0, 380 + solarMultiplier * 180 + Math.random() * 45),
      power: Math.max(0, 2000 + solarMultiplier * 3000 + Math.random() * 500)
    });
  }
  
  return data;
};

// Generateing mock data for weather chart

export const generateWeatherTrendData = () => {
    const trendData = [];
    const now = new Date();

    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      trendData.push({
        time: time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        ghi: Math.max(
          0,
          850 +
            Math.sin(((24 - i) * Math.PI) / 12) * 400 +
            Math.random() * 100 -
            50
        ),
        temperature:
          25 + Math.sin(((24 - i) * Math.PI) / 12) * 8 + Math.random() * 4 - 2,
        windSpeed: 5 + Math.random() * 10,
        humidity: 40 + Math.random() * 30,
      });
    }

    return trendData;
  };