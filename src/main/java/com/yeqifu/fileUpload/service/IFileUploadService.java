package com.yeqifu.fileUpload.service;


import com.yeqifu.fileUpload.controller.ReturnValue;
import org.springframework.web.multipart.MultipartFile;

/**
 * <p>
 * InnoDB free: 9216 kB; (`providerid`) REFER `warehouse/bus_provider`(`id`) 服务类
 * </p>
 *
 * @author 爱吃西红柿
 * @since
 */
public interface IFileUploadService{

    public ReturnValue uploadFileTest(MultipartFile zipFile);
}
