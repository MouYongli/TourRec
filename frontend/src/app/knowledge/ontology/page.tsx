"use client";

import { useState } from "react";
import FileUploadManager from "@/components/file/FileUploadManager";
import OntologyGraph from "@/components/knowledge/ontology/OntologyGraph";
import OntologyEditor from "@/components/knowledge/ontology/OntologyEditor";

export default function OntologyPage() {
  const [ontologyData, setOntologyData] = useState({ nodes: [], edges: [] });

  // 解析 OWL 文件
  const handleParseFile = async (filename: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/files/${filename}/parse`);
      if (!response.ok) throw new Error("解析失败");
      const data = await response.json();
      console.log("解析数据:", data);
      setOntologyData(data.graph);
    } catch (error) {
      console.error("解析文件失败:", error);
    }
  };

  const handleRefreshFiles = () => {
    console.log("刷新文件列表");
  };

  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2 flex flex-col gap-4">
        <FileUploadManager onRefresh={handleRefreshFiles} onParseFile={handleParseFile} />
        <div className="bg-gray-100 p-4 rounded-lg h-[600px] shadow">
          <h2 className="text-xl font-bold mb-4">Ontology 知识图谱</h2>
          <OntologyGraph ontologyData={ontologyData} />
        </div>
      </div>
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">编辑 Ontology</h2>
        <OntologyEditor />
      </div>
    </div>
  );
}
