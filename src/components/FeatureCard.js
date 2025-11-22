import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
      }}
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-300"
    >
      <div className="text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;