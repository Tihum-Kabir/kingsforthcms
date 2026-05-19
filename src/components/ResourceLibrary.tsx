import { motion } from 'motion/react';
import { FileText, Download, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const resources = [
  {
    type: 'White Paper',
    title: 'The Future of Threat Detection in Enterprise Environments',
    description:
      'Comprehensive analysis of AI-powered security systems and their measurable impact on incident response times and operational costs.',
    date: 'January 2026',
    readTime: '12 min read',
  },
  {
    type: 'Case Study',
    title: 'How a Major University Reduced Response Times by 73%',
    description:
      'Real-world deployment case study featuring a 15,000-student campus security transformation using Cognitive Surveillance and Autonomous Field Ops.',
    date: 'December 2025',
    readTime: '8 min read',
  },
  {
    type: 'White Paper',
    title: 'Integrating Legacy Systems with Modern Intelligence Platforms',
    description:
      'Technical guide to connecting existing VMS and access control infrastructure with next-generation AI analytics without operational disruption.',
    date: 'November 2025',
    readTime: '15 min read',
  },
  {
    type: 'Guide',
    title: 'ROI Calculator: Security Intelligence Investment',
    description:
      'Data-driven framework for calculating return on investment in advanced AI security systems — with benchmarks from 40+ enterprise deployments.',
    date: 'November 2025',
    readTime: '6 min read',
  },
  {
    type: 'White Paper',
    title: 'Compliance & Privacy in Modern AI Security Systems',
    description:
      'Navigating GDPR, FERPA, HIPAA, and regional regulations while maintaining effective AI-powered security operations.',
    date: 'October 2025',
    readTime: '10 min read',
  },
  {
    type: 'Case Study',
    title: 'Fortune 500 Corporation: Multi-Site AI Deployment',
    description:
      'How a global enterprise unified 47 facilities across 12 countries under a single KTL intelligence platform — reducing security incidents by 68%.',
    date: 'October 2025',
    readTime: '11 min read',
  },
];

export function ResourceLibrary() {
  return (
    <section id="resources" className="relative py-36 bg-black">
      <div className="max-w-[1500px] mx-auto px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Resource Library
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-[700px] mx-auto font-light leading-relaxed">
            Industry insights, technical guides, and real-world deployment case studies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
          {resources.map((resource, index) => (
            <motion.div
              key={`${resource.title}-${index}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              className="group cursor-pointer"
            >
              <div className="h-full p-9 rounded-2xl bg-linear-to-br from-white/[0.05] to-white/[0.01] border border-white/[0.09] hover:border-violet-500/25 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30">
                <div className="flex items-start justify-between mb-7">
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <FileText className="w-3.5 h-3.5 text-violet-400" strokeWidth={2} />
                    <span className="text-[12px] font-semibold text-violet-300">{resource.type}</span>
                  </div>
                  <Download className="w-5 h-5 text-gray-600 group-hover:text-violet-400 transition-colors" strokeWidth={2} />
                </div>

                <h3 className="text-[21px] font-bold text-white mb-4 group-hover:text-violet-300 transition-colors leading-snug tracking-tight">
                  {resource.title}
                </h3>
                <p className="text-[15px] text-gray-500 mb-7 leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between text-[13px] text-gray-600 mb-5">
                  <span>{resource.date}</span>
                  <span>{resource.readTime}</span>
                </div>

                <div className="flex items-center gap-2 text-[15px] text-violet-400 group-hover:text-violet-300 transition-colors font-medium">
                  <span>Download</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="h-13 px-10 text-[16px] font-medium border-white/10 text-gray-300 hover:bg-white/[0.05] hover:border-white/20 hover:text-white transition-all duration-200"
          >
            View All Resources
          </Button>
        </div>
      </div>
    </section>
  );
}
