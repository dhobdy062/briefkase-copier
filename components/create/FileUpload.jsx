import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Image, Check, Sparkles } from "lucide-react";

export default function FileUpload({ resumeFile, setResumeFile, photoFile, setPhotoFile, onProcess, processing }) {
  const resumeInputRef = useRef(null);
  const photoInputRef = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="p-8 bg-white border-slate-200 shadow-xl">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Resume / CV
            </label>
            <div
              onClick={() => resumeInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                resumeFile
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-3">
                {resumeFile ? (
                  <>
                    <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{resumeFile.name}</p>
                      <p className="text-sm text-slate-600">
                        {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center">
                      <FileText className="w-8 h-8 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Upload Resume</p>
                      <p className="text-sm text-slate-600">PDF only</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Professional Photo
            </label>
            <div
              onClick={() => photoInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                photoFile
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files[0])}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-3">
                {photoFile ? (
                  <>
                    <div className="w-16 h-16 rounded-2xl overflow-hidden">
                      <img
                        src={URL.createObjectURL(photoFile)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{photoFile.name}</p>
                      <p className="text-sm text-slate-600">
                        {(photoFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center">
                      <Image className="w-8 h-8 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Upload Photo</p>
                      <p className="text-sm text-slate-600">JPG, PNG</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={onProcess}
          disabled={!resumeFile || !photoFile || processing}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-xl text-lg disabled:opacity-50"
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
              Processing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Portfolio
            </>
          )}
        </Button>
      </Card>
    </motion.div>
  );
}