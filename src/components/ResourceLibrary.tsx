import { motion } from 'motion/react';
import { FileText, Download, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export function ResourceLibrary() {
  const resources = [
    {
      type: 'White Paper',
      title: 'The Future of Threat Detection in Enterprise Environments',
      description: 'Comprehensive analysis of AI-powered security systems and their impact on incident response times.',
      date: 'January 2026',
      readTime: '12 min read',
    },
    {
      type: 'Case Study',
      title: 'How City College Reduced Response Times by 73%',
      description: 'Real-world deployment case study featuring a 15,000-student campus security transformation.',
      date: 'December 2025',
      readTime: '8 min read',
    },
    {
      type: 'White Paper',
      title: 'Integrating Legacy Systems with Modern Intelligence Platforms',
      description: 'Technical guide to connecting existing VMS and access control systems with next-gen analytics.',
      date: 'November 2025',
      readTime: '15 min read',
    },
    {
      type: 'Guide',
      title: 'ROI Calculator: Security Intelligence Investment',
      description: 'Data-driven framework for calculating return on investment in advanced security systems.',
      date: 'November 2025',
      readTime: '6 min read',
    },
    {
      type: 'White Paper',
      title: 'Compliance & Privacy in Modern Security Systems',
      description: 'Navigating GDPR, FERPA, and other regulations while maintaining effective security operations.',
      date: 'October 2025',
      readTime: '10 min read',
    },
    {
      type: 'Case Study',
      title: 'Fortune 500 Corporation: Multi-Site Deployment',
      description: 'How a global enterprise unified 47 facilities under a single intelligence platform.',
      date: 'October 2025',
      readTime: '11 min read',
    },
  ];

  return (
    <section className="relative py-32 bg-black">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-[64px] font-bold text-white mb-5 tracking-tight">
            Resource Library
          </h2>
          <p className="text-[19px] text-gray-400 max-w-[680px] mx-auto font-light leading-relaxed">
            Industry insights, technical guides, and real-world deployments
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {resources.map((resource, index) => (
            <motion.div
              key={`${resource.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group cursor-pointer"
            >
              <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] backdrop-blur-sm hover:border-violet-500/20 hover:bg-white/[0.06] transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <FileText className="w-3.5 h-3.5 text-violet-400" strokeWidth={2} />
                    <span className="text-[12px] font-medium text-violet-300">{resource.type}</span>
                  </div>
                  <Download className="w-5 h-5 text-gray-600 group-hover:text-violet-400 transition-colors" strokeWidth={2} />
                </div>

                <h3 className="text-[20px] font-bold text-white mb-3 group-hover:text-violet-300 transition-colors leading-snug tracking-tight">
                  {resource.title}
                </h3>
                <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between text-[12px] text-gray-600 mb-4">
                  <span>{resource.date}</span>
                  <span>{resource.readTime}</span>
                </div>

                <div className="flex items-center gap-2 text-[14px] text-violet-400 group-hover:text-violet-300 transition-colors">
                  <span className="font-medium">Download</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="h-12 px-8 text-[15px] font-medium border-white/10 text-gray-300 hover:bg-white/[0.04] hover:border-white/20 hover:text-white transition-all duration-200"
          >
            View All Resources
          </Button>
        </div>
      </div>
    </section>
  );
}