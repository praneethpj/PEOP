package com.peop.backend.repository;

import com.peop.backend.model.PaymentSheduled;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Praneethpj
 */
@Repository
public interface PaymentRepository extends JpaRepository<PaymentSheduled,Long> {
    List<PaymentSheduled> findByProfessionId(Long professionId);
    List<PaymentSheduled> findByUserId(Long userid);
}
