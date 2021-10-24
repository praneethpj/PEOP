package com.peop.backend.repository;

import com.peop.backend.model.PaymentSheduled;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Praneethpj
 */
@Repository
public interface PaymentRepository extends JpaRepository<PaymentSheduled,Long> {

}
