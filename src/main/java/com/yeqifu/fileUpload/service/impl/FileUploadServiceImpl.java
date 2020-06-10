package com.yeqifu.fileUpload.service.impl;

import com.yeqifu.fileUpload.controller.ReturnCodeAndMsgEnum;
import com.yeqifu.fileUpload.controller.ReturnValue;
import com.yeqifu.fileUpload.service.IFileUploadService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

/**
 * @author lanxuewei Create in 2018/8/14 10:01
 * Description:
 */
@Service
public class FileUploadServiceImpl implements IFileUploadService {
    private static final Logger logger = LoggerFactory.getLogger(FileUploadServiceImpl.class);

    @Override
    public ReturnValue uploadFileTest(MultipartFile zipFile) {
        String targetFilePath = "D:\\test\\uploadTest";
        String fileName = UUID.randomUUID().toString().replace("-", "");
        File targetFile = new File(targetFilePath + File.separator + fileName);
        FileOutputStream fileOutputStream = null;
        try {
            fileOutputStream = new FileOutputStream(targetFile);
            IOUtils.copy(zipFile.getInputStream(), fileOutputStream);
            logger.info("------>>>>>>uploaded a file successfully!<<<<<<------");
        } catch (IOException e) {
            return new ReturnValue<>(-1, null);
        } finally {
            try {
                fileOutputStream.close();
            } catch (IOException e) {
                logger.error("", e);
            }
        }
        return new ReturnValue<>(ReturnCodeAndMsgEnum.Success, null);
    }
}

