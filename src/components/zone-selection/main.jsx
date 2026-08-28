// import React, { useEffect, useState } from 'react';
// import { Card, Button, Row, Col } from 'antd';
// import { DoubleRightOutlined, LockOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import '../../style/zone.css';
// import Zone1 from '../../assets/Zone1.png';
// import Zone2 from '../../assets/Zone2.png';
// import Zone3 from '../../assets/Zone3.png';
// import Zone4 from '../../assets/Zone4.png';
// import { motion } from 'framer-motion';

// const { Meta } = Card;

// const normalizeUnlockedZone = (val) => {
//   if (!val) return 'zone01';
//   const s = String(val).trim().toLowerCase();

//   // If already in 'zoneXX' format, return it (but ensure two-digit numeric suffix)
//   const matchZone = s.match(/^zone0?(\d+)$/);
//   if (matchZone) {
//     const num = matchZone[1].padStart(2, '0');
//     return `zone${num}`;
//   }

//   // If it's just digits like '3' or '03'
//   const digits = s.replace(/\D/g, '');
//   if (digits) {
//     const num = digits.padStart(2, '0');
//     return `zone${num}`;
//   }

//   // fallback
//   return 'zone01';
// };

// const Main = () => {
//   const navigate = useNavigate();

//   // This state stores the highest unlocked zone (e.g. 'zone01', 'zone02', etc.)
//   const [unlockedZone, setUnlockedZone] = useState('zone01');

//   // Load unlocked zone from localStorage and normalize it
//   useEffect(() => {
//     const raw = localStorage.getItem('unlockedZone');
//     console.log('Raw unlockedZone from localStorage:', raw);
    
//     const normalized = normalizeUnlockedZone(raw);
//     console.log('Normalized unlockedZone:', normalized);

//     // Ensure normalized is one of allowed zones; otherwise default to zone01
//     const allowed = ['zone01', 'zone02', 'zone03', 'zone04'];
//     const finalZone = allowed.includes(normalized) ? normalized : 'zone01';
    
//     console.log('Final unlockedZone:', finalZone);

//     setUnlockedZone(finalZone);
//     // keep localStorage consistent with normalized/allowed value
//     localStorage.setItem('unlockedZone', finalZone);
//   }, []);

//   const handleZoneClick = (zoneName) => {
//     localStorage.setItem('zone', zoneName);
//     navigate(`/questionnaire?zone=${zoneName}`);
//   };

//   // canonical zones in order
//   const zonesOrder = ['zone01', 'zone02', 'zone03', 'zone04'];

//   // find the index of the unlocked zone (guaranteed to exist due to normalization)
//   const unlockedIndex = zonesOrder.indexOf(unlockedZone);

//   // zone definitions
//   const zones = [
//     { id: 'zone01', title: 'Zone 01', image: Zone1 },
//     { id: 'zone02', title: 'Zone 02', image: Zone2 },
//     { id: 'zone03', title: 'Zone 03', image: Zone3 },
//     { id: 'zone04', title: 'Zone 04', image: Zone4 },
//   ].map((zone, index) => ({
//     ...zone,
//     // ONLY unlock the exact zone that matches unlockedIndex
//     // Lock all other zones
//     locked: index !== unlockedIndex,
//   }));

//   return (
//     <div className="zone-container">
//       <div className="zone-wrapper">
//         <Row gutter={[24, 24]} justify="center" align="middle">
//           {zones.map((zone) => (
//             <Col xs={24} sm={12} md={12} lg={6} xl={6} key={zone.id}>
//               <Card
//                 hoverable={!zone.locked}
//                 cover={<img alt={zone.title} src={zone.image} />}
//                 className={`zone-card ${zone.locked ? 'locked-card' : ''}`}
//                 actions={[
//                   zone.locked ? (
//                     <Button disabled className="zone-button locked-button">
//                       Locked <LockOutlined />
//                     </Button>
//                   ) : (
//                     <Button
//                       type="primary"
//                       onClick={() => handleZoneClick(zone.id)}
//                       className="zone-button"
//                     >
//                       Select Zone
//                       <motion.span
//                         initial={{ x: 0 }}
//                         animate={{ x: [0, 5, 0] }}
//                         transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
//                       >
//                         <DoubleRightOutlined />
//                       </motion.span>
//                     </Button>
//                   ),
//                 ]}
//               >
//                 <Meta title={zone.title} description={zone.locked ? 'Locked Zone' : ''} />
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default Main;

import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { DoubleRightOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../style/zone.css';
import Zone1 from '../../assets/Zone1.png';
import Zone2 from '../../assets/Zone2.png';
import Zone3 from '../../assets/Zone3.png';
import Zone4 from '../../assets/Zone4.png';
import FinalZone from '../../assets/Achievement.png';
import { motion } from 'framer-motion';

const { Meta } = Card;

const Main = () => {
  const navigate = useNavigate();

  const handleZoneClick = (zoneName) => {
    localStorage.setItem('zone', zoneName);
    navigate(`/questionnaire?zone=${zoneName}`);
  };

  const zones = [
    { id: 'zone01', title: 'Zone 01', image: Zone1 },
    { id: 'zone02', title: 'Zone 02', image: Zone2 },
    { id: 'zone03', title: 'Zone 03', image: Zone3 },
    { id: 'zone04', title: 'Zone 04', image: Zone4 },
  ].map((zone) => ({
    ...zone,
    locked: true,
  }));

  return (
    <div className="zone-container">
      <div className="zone-wrapper">
        <Row gutter={[24, 24]} justify="center" align="middle">
          {zones.map((zone) => (
            <Col xs={24} sm={12} md={12} lg={6} xl={6} key={zone.id}>
              <Card
                hoverable={!zone.locked}
                cover={<img alt={zone.title} src={zone.image} />}
                className={`zone-card ${zone.locked ? 'locked-card' : ''}`}
                actions={[
                  zone.locked ? (
                    <Button disabled className="zone-button locked-button">
                      Locked <LockOutlined />
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={() => handleZoneClick(zone.id)}
                      className="zone-button"
                    >
                      Select Zone
                      <motion.span
                        initial={{ x: 0 }}
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                      >
                        <DoubleRightOutlined />
                      </motion.span>
                    </Button>
                  ),
                ]}
              >
                <Meta title={zone.title} description={zone.locked ? 'Locked Zone' : ''} />
              </Card>
            </Col>
          ))}

          <Col xs={24} sm={12} md={12} lg={6} xl={6} key="final">
            <Card
              hoverable
              cover={<img alt="Final zone" src={FinalZone} />}
              className="zone-card final-zone-card"
              actions={[
                <Button
                  type="primary"
                  onClick={() => handleZoneClick('final')}
                  className="zone-button"
                >
                  Select Zone
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  >
                    <DoubleRightOutlined />
                  </motion.span>
                </Button>
              ]}
            >
              <Meta title="Final zone" />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Main;